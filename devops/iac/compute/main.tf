module "azurerm_kubernetes_cluster" {
    source = "../modules/TerraformAKS"
    
}
module "azure_acr" {
    source = "../modules/terraformACR"
  
}

module "service_bus" {
    source = "../modules/service bus"
    namespace_name      = "utk-svc-bus-tf"
    location            = "east us"
    sku                 = "Basic"
    queue_name          = "utk-svc-queue"
}

module "event_hub" {
    source = "../modules/eventHub"
    namespace_name       = "utk-event-hub"
    location             = "East US"
    sku                  = "Standard"
    eventhub_name        = "server-running"
    partition_count      = 1
    message_retention    = 1
    consumer_group_name  = "utkarsh-consumer-group"
  
}