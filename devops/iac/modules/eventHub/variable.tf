variable "namespace_name" {
  description = "The name of the Event Hub namespace."
  type        = string
  default = "utk-event-hub"
}

variable "location" {
  description = "The location where the Event Hub namespace will be created."
  type        = string
  default = "East US"
}

variable "sku" {
  description = "The SKU of the Event Hub namespace."
  type        = string
  default = "Standard"
}

variable "eventhub_name" {
  description = "The name of the Event Hub."
  type        = string
  default = "server-running"
}

variable "partition_count" {
  description = "The number of partitions in the Event Hub."
  type        = number
  default = 1
}

variable "message_retention" {
  description = "The message retention period in days."
  type        = number
  default = 1
}

variable "consumer_group_name" {
  description = "The name of the consumer group."
  type        = string
  default = "utkarsh-consumer-group"
}
