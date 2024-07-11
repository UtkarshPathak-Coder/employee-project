module "azurerm_kubernetes_cluster" {
    source = "../TerraformAKS"
    
}
module "azure_acr" {
    source = "../terraformACR"
  
}