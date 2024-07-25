module "azurerm_kubernetes_cluster" {
    source = "../modules/TerraformAKS"
    
}
module "azure_acr" {
    source = "../modules/terraformACR"
  
}

module "service_bus" {
    source = "../modules/service bus"
    
}

module "event_hub" {
    source = "../modules/eventHub"
  
}