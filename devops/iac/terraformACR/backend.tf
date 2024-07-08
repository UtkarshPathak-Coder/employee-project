terraform {
  backend "azurerm" {
    storage_account_name = "akstasksa"
    container_name       = "akscontainer"
    key                  = "terraform.tfstate"
    resource_group_name  = "Utkarsh-Pathak-rg"
    subscription_id      = "14d51dca-be7f-45d5-83f7-bc5ba5a5cfcb"
  }
}
