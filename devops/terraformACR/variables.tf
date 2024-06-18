variable "location" {
  description = "The Azure region where resources will be created"
  type        = string
  default     = "East US"
}

variable "acr_name" {
  description = "The name of the Azure Container Registry"
  type        = string
  default     = "acrutkterraform"
}


variable "subscription_id" {
  description = "The Azure subscription ID"
  type        = string
  default     = "14d51dca-be7f-45d5-83f7-bc5ba5a5cfcb"
}