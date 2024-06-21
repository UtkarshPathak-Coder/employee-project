data "azurerm_resource_group" "existing" {
  name = "Utkarsh-Pathak-rg" 
}

resource "azurerm_kubernetes_cluster" "aks" {
  name                = var.aks_cluster_name
  location            = var.location
  resource_group_name = data.azurerm_resource_group.existing.name
  dns_prefix          = var.dns_prefix

  default_node_pool {
    name       = "default"
    node_count = var.node_count
    vm_size    = var.vm_size
  }

  identity {
    type = "SystemAssigned"
  }

  tags = {
    Environment = "Development"
  }
}

data "azurerm_kubernetes_cluster" "aks" {
  name                = azurerm_kubernetes_cluster.aks.name
  resource_group_name = data.azurerm_resource_group.existing.name

  depends_on = [azurerm_kubernetes_cluster.aks]
}


resource "local_file" "kubeconfig" {
  content  = data.azurerm_kubernetes_cluster.aks.kube_config_raw
  filename = "${path.module}/kubeconfig"
}

resource "null_resource" "apply_k8s_manifests" {
  provisioner "local-exec" {
    command = <<EOT
     kubectl apply -f ${path.module}/../empwebapp/templates/postgres-statefulsets.yaml --kubeconfig=${path.module}/kubeconfig && kubectl apply -f ${path.module}/../empwebapp/templates/postgres-service.yaml --kubeconfig=${path.module}/kubeconfig   &&  kubectl apply -f ${path.module}/../empwebapp/templates/pvc-service.yaml --kubeconfig=${path.module}/kubeconfig &&  kubectl apply -f ${path.module}/../empwebapp/templates/backend-deployment.yaml --kubeconfig=${path.module}/kubeconfig &&      kubectl apply -f ${path.module}/../empwebapp/templates/backend-service.yaml --kubeconfig=${path.module}/kubeconfig    &&      kubectl apply -f ${path.module}/../empwebapp/templates/frontend-deployment.yaml --kubeconfig=${path.module}/kubeconfig   &&       kubectl apply -f ${path.module}/../empwebapp/templates/frontend-service.yaml --kubeconfig=${path.module}/kubeconfig  
    EOT 
    environment = {
      KUBECONFIG = "${path.module}/kubeconfig"
    }
  }

  triggers = {
    always_run = timestamp()
  }

  depends_on = [
    azurerm_kubernetes_cluster.aks,
    local_file.kubeconfig
  ]
}