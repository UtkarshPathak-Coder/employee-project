data "azurerm_resource_group" "existing" {
  name = "Utkarsh-Pathak-rg" 
}


resource "azurerm_container_registry" "main" {
  name                = var.acr_name
  resource_group_name = data.azurerm_resource_group.existing.name
  location            = var.location
  sku                 = "Standard"

  admin_enabled = true
}

resource "null_resource" "docker_login" {
  provisioner "local-exec" {
    command = "az acr login --name ${azurerm_container_registry.main.name}"
  }
}

resource "null_resource" "push_images" {
  depends_on = [null_resource.docker_login]

  provisioner "local-exec" {
    command = <<EOT
      az acr login --name ${azurerm_container_registry.main.name} && cd ../backend  && docker build -t ${azurerm_container_registry.main.login_server}/backend:latest .   && docker push ${azurerm_container_registry.main.login_server}/backend:latest  && cd ../database && docker build -t ${azurerm_container_registry.main.login_server}/database:latest . &&  docker push ${azurerm_container_registry.main.login_server}/database:latest && cd ../../frontend && docker build -t ${azurerm_container_registry.main.login_server}/frontend:latest . && docker push ${azurerm_container_registry.main.login_server}/frontend:latest
        
    EOT

    
  }
}
