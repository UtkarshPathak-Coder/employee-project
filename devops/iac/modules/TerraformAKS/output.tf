output "kube_config" {
  value     = data.azurerm_kubernetes_cluster.aks.kube_config_raw
  sensitive = true
}
