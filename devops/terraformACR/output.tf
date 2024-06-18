output "acr_login_server" {
  description = "The URL that can be used to log into the ACR"
  value       = azurerm_container_registry.main.login_server
}

output "acr_admin_username" {
  description = "The admin username for the ACR"
  value       = azurerm_container_registry.main.admin_username
}

output "acr_admin_password" {
  description = "The admin password for the ACR"
  value       = azurerm_container_registry.main.admin_password
  sensitive   = true
}
