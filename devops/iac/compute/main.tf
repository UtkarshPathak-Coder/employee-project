module "azurerm_kubernetes_cluster" {
    source = "../TerraformAKS"
    
}
module "azure_acr" {
    source = "../terraformACR"
  
}

module "service_bus" {
    source = "../service bus"
    
}

module "event_hub" {
    source = "../eventHub"
  
}