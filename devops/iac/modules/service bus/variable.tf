variable "namespace_name" {
  description = "The name of the Service Bus namespace."
  type        = string
  default = "utk-svc-bus-tf"
}

variable "location" {
  description = "The location where the Service Bus namespace will be created."
  type        = string
  default = "east US"
}

variable "sku" {
  description = "The SKU of the Service Bus namespace."
  type        = string
  default = "Basic"
}

variable "queue_name" {
  description = "The name of the Service Bus queue."
  type        = string
  default = "utk-svc-queue"
}
