import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Task } from 'src/app/Task';
import { ShipmentTypes } from 'src/app/shipmentTypes';
import { ProcurementTypes } from 'src/app/procurementTypes';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'Application/json',
  }),
};

const shipmentTasks: ShipmentTypes[] = [
  {
    fields: [
      {
        fieldName: 'limbiqReferenceId',
      },
    ],
    name: 'Limbiq Reference ID',
    type: 'string',
  },
  {
    fields: [
      {
        fieldName: 'externalId',
      },
    ],
    name: 'External ID',
    type: 'string',
  },
  {
    fields: [
      {
        fieldName: 'status',
      },
    ],
    name: 'Status',
    type: 'string',
    enumType: 'ShipmentStatus',
    valueMapping: {
      CARGO_PLANNED: 'Cargo Planned',
      CARGO_READY: 'Cargo Ready',
      SHIPMENT_PLACED: 'Shipment Placed',
      SHIPMENT_CONFIRMED: 'Shipment Confirmed',
      ESCALATION_CLARIFICATION: 'Clarification',
      CARGO_DISPATCHED: 'Cargo Dispatched',
      SHIPPED: 'Shipped',
      ARRIVED_AT_POD: 'Arrived at POD',
      SHIPPED_FROM_POD_TO_DESTINATION: 'Shipped from POD',
      ARRIVED_AT_DESTINATION: 'Arrived at Destination',
      CANCELLED: 'Cancelled',
    },
  },
  {
    fields: [
      {
        fieldName: 'extendedPartners[role=CONSIGNEE].groupPartner.groupName',
      },
    ],
    name: 'Partner - Consignee - Company Name',
    type: 'string',
  },
  {
    fields: [
      {
        fieldName: 'extendedPartners[role=CONSIGNEE].groupPartner.groupCode',
      },
    ],
    name: 'Partner - Consignee - Company Code',
    type: 'string',
  },
  {
    fields: [
      {
        fieldName: 'extendedPartners[role=CONSIGNEE].email',
      },
    ],
    name: 'Partner - Consignee - Email',
    type: 'string',
  },
  {
    fields: [
      {
        fieldName: 'extendedPartners[role=SHIPPER].groupPartner.groupName',
      },
    ],
    name: 'Partner - Shipper - Company Name',
    type: 'string',
  },
  {
    fields: [
      {
        fieldName: 'extendedPartners[role=SHIPPER].groupPartner.groupCode',
      },
    ],
    name: 'Partner - Shipper - Company Code',
    type: 'string',
  },
  {
    fields: [
      {
        fieldName: 'extendedPartners[role=SHIPPER].email',
      },
    ],
    name: 'Partner - Shipper - Email',
    type: 'string',
  },
  {
    fields: [
      {
        fieldName: 'extendedPartners[role=FORWARDER].groupPartner.groupName',
      },
    ],
    name: 'Partner - Forwarder - Company Name',
    type: 'string',
  },
  {
    fields: [
      {
        fieldName: 'extendedPartners[role=FORWARDER].groupPartner.groupCode',
      },
    ],
    name: 'Partner - Forwarder - Company Code',
    type: 'string',
  },
  {
    fields: [
      {
        fieldName: 'extendedPartners[role=FORWARDER].email',
      },
    ],
    name: 'Partner - Forwarder - Email',
    type: 'string',
  },
  {
    fields: [
      {
        fieldName:
          'extendedPartners[role=NOTIFICATION_PARTY].groupPartner.groupName',
      },
    ],
    name: 'Partner - Notify Party - Company Name',
    type: 'string',
  },
  {
    fields: [
      {
        fieldName:
          'extendedPartners[role=NOTIFICATION_PARTY].groupPartner.groupCode',
      },
    ],
    name: 'Partner - Notify Party - Company Code',
    type: 'string',
  },
  {
    fields: [
      {
        fieldName: 'extendedPartners[role=NOTIFICATION_PARTY].email',
      },
    ],
    name: 'Partner - Notify Party - Email',
    type: 'string',
  },
  {
    fields: [
      {
        fieldName: 'carrier',
      },
    ],
    name: 'Carrier',
    type: 'string',
  },
  {
    fields: [
      {
        fieldName: 'freightPaymentTerms', 
      },
    ],
    name: 'Freight Payment Terms',
    type: 'string',
  },
  {
    fields: [
      {
        fieldName: 'freightCostCurrency',
      },
    ],
    name: 'Freight Cost Currency',
    type: 'string',
  },
  {
    fields: [
      {
        fieldName: 'vesselNumber.name',
      },
    ],
    name: 'Vessel #/Flight #/Rail #/Truck',
    type: 'string',
  },
  {
    fields: [
      {
        fieldName: 'carrierReferenceNumber',
      },
    ],
    name: 'Carrier Reference Number',
    type: 'string',
  },
  {
    fields: [
      {
        fieldName: 'onCarriage',
      },
    ],
    name: 'On Carriage',
    type: 'string',
  },
  {
    fields: [
      {
        fieldName: 'shipmentType',
      },
    ],
    name: 'Shipment Type',
    type: 'string',
  },
  {
    fields: [
      {
        fieldName: 'hazmatDetails.unNaNumber',
      },
    ],
    name: 'Hazmat - UN/NA #',
    type: 'string',
  },
  {
    fields: [
      {
        fieldName: 'hazmatDetails.hazmatClass',
      },
    ],
    name: 'Hazmat - Class',
    type: 'string',
  },
  {
    fields: [
      {
        fieldName: 'hazmatDetails.hazmatPackagingGroup', 
      },
    ],
    name: 'Hazmat - Packaging Grp',
    type: 'string',
  },
  {
    fields: [
      {
        fieldName: 'hazmatDetails.hazmatCommodity',
      },
    ],
    name: 'Hazmat - Commodity',
    type: 'string',
  },
  {
    fields: [
      {
        fieldName: 'hazmatDetails.emergencyContact',
      },
    ],
    name: 'Hazmat - Emergency Contact',
    type: 'string',
  },
  {
    fields: [
      {
        fieldName: 'hazmatDetails.notes',
      },
    ],
    name: 'Hazmat - Notes',
    type: 'string',
  },
  {
    fields: [
      {
        fieldName: 'newInstructions',
      },
    ],
    name: 'Shipment Notes',
    type: 'string',
  },
  {
    fields: [
      {
        fieldName: 'mot',
      },
    ],
    name: 'MOT',
    type: 'string',
    enumType: 'MOT',
    defaultValue: 'Sea',
    valueMapping: {
      AIR: 'Air',
      BARGE: 'Barge',
      BARGE_RAIL_TRUCK: 'Barge Rail Truck',
      BARGE_TRUCK: 'Barge Truck',
      NOT_APPLICABLE: 'Not Applicable',
      RAIL: 'Rail',
      RAIL_TRUCK: 'Rail truck',
      SEA: 'Sea',
      SEA_AIR: 'Sea Air',
      TRUCK: 'Truck',
    },
  },
  {
    fields: [
      {
        fieldName: 'incoterm',
      },
    ],
    name: 'Incoterm',
    type: 'string',
    enumType: 'Incoterm',
    defaultValue: 'FOB',
    valueMapping: {
      CFR: 'CFR',
      CIF: 'CIF',
      CIP: 'CIP',
      CPT: 'CPT',
      DAP: 'DAP',
      DDP: 'DDP',
      DPU: 'DPU',
      EXW: 'EXW',
      FAS: 'FAS',
      FCA: 'FCA',
      FOB: 'FOB',
    },
  },
  {
    fields: [
      {
        fieldName: 'extendedTransshipPorts[type=POL].address', 
      },
    ],
    name: 'Transshipport - Address',
    type: 'string',
  },
  {
    fields: [
      {
        fieldName: 'extendedTransshipPorts[type=POL].city.name',
      },
    ],
    name: 'Transshipport - City - Name',
    type: 'string',
  },
  {
    fields: [
      {
        fieldName: 'extendedTransshipPorts[type=POL].city.unLocode',
      },
    ],
    name: 'Transshipport - City - Unlocode',
    type: 'string',
  },
  {
    fields: [
      {
        fieldName: 'extendedTransshipPorts[type=POL].plannedTime',
      },
    ],
    name: 'Transshipport - Planned Time',
    type: 'string',
  },
  {
    fields: [
      {
        fieldName: 'extendedTransshipPorts[type=POL].estimatedTime',
      },
    ],
    name: 'Transshipport - Estimated Time',
    type: 'string',
  },
  {
    fields: [
      {
        fieldName: 'extendedTransshipPorts[type=POL].actualTime',
      },
    ],
    name: 'Transshipport - Actual Time',
    type: 'string',
  },
  {
    fields: [
      {
        fieldName: 'measurementUnit',
      },
    ],
    name: 'Quantity Type/UOM',
    type: 'string',
  },
  {
    fields: [
      {
        fieldName: 'packagingType',
      },
    ],
    name: 'Packaging Type',
    type: 'string',
  },
  {
    fields: [
      {
        fieldName: 'packagingDimensionLength.uom',
      },
    ],
    name: 'Pkg. Dim. Length UOM',
    type: 'string',
  },
  {
    fields: [
      {
        fieldName: 'packagingDimensionWidth.uom', 
      },
    ],
    name: 'Pkg. Dim. Width UOM',
    type: 'string',
  },
  {
    fields: [
      {
        fieldName: 'packagingDimensionHeight.uom',
      },
    ],
    name: 'Pkg. Dim. Height UOM',
    type: 'string',
  },
  {
    fields: [
      {
        fieldName: 'extendedCargos.purchaseOrderLabel',
      },
    ],
    name: 'Cargo Order #',
    type: 'string',
  },
  {
    fields: [
      {
        fieldName: 'extendedCargos.productName', 
      },
    ],
    name: 'Cargo Product Name',
    type: 'string',
  },
  {
    fields: [
      {
        fieldName: 'extendedCargos.productCode',
      },
    ],
    name: 'Cargo Product Code',
    type: 'string',
  },
  {
    fields: [
      {
        fieldName: 'extendedCargos.measurementUnit',
      },
    ],
    name: 'Cargo Quantity Type/UOM',
    type: 'string',
  },
  {
    fields: [
      {
        fieldName: 'extendedCargos.packagingType', 
      },
    ],
    name: 'Cargo Packaging Type',
    type: 'string',
  },
  {
    fields: [
      {
        fieldName: 'extendedCargos.packagingDimensionLength.uom',
      },
    ],
    name: 'Cargo Pkg. Dim. Length UOM',
    type: 'string',
  },
  {
    fields: [
      {
        fieldName: 'extendedCargos.packagingDimensionWidth.uom',
      },
    ],
    name: 'Cargo Pkg. Dim. Width UOM',
    type: 'string',
  },
  {
    fields: [
      {
        fieldName: 'extendedCargos.packagingDimensionHeight.uom',
      },
    ],
    name: 'Cargo Pkg. Dim. Height UOM',
    type: 'string',
  },
  {
    fields: [
      {
        fieldName: 'extendedCargos.currency',
      },
    ],
    name: 'Cargo Currency',
    type: 'string',
  },
  {
    fields: [
      {
        fieldName: 'extendedCargos.hazmatDetails.unNaNumber',
      },
    ],
    name: 'Cargo Hazmat - UN/NA #',
    type: 'string',
  },
  {
    fields: [
      {
        fieldName: 'extendedCargos.hazmatDetails.hazmatClass', 
      },
    ],
    name: 'Cargo Hazmat - Class',
    type: 'string',
  },
  {
    fields: [
      {
        fieldName: 'extendedCargos.hazmatDetails.hazmatPackagingGroup',
      },
    ],
    name: 'Cargo Hazmat - Packaging Grp',
    type: 'string',
  },
  {
    fields: [
      {
        fieldName: 'extendedCargos.hazmatDetails.hazmatCommodity',
      },
    ],
    name: 'Cargo Hazmat - Commodity',
    type: 'string',
  },
  {
    fields: [
      {
        fieldName: 'extendedCargos.hazmatDetails.emergencyContact',
      },
    ],
    name: 'Cargo Hazmat - Emergency Contact',
    type: 'string',
  },
  {
    fields: [
      {
        fieldName: 'extendedCargos.hazmatDetails.notes',
      },
    ],
    name: 'Cargo Hazmat - Notes',
    type: 'string',
  },
  {
    fields: [
      {
        fieldName: 'extendedCargos.containerNumber',
      },
    ],
    name: 'Cargo Container Number',
    type: 'string',
  },
  {
    fields: [
      {
        fieldName: 'extendedContainers.containerNumber',
      },
    ],
    name: 'CN Container Number',
    type: 'string',
  },
  {
    fields: [
      {
        fieldName: 'extendedContainers.containerCode',
      },
    ],
    name: 'CN Container Code',
    type: 'string',
  },
  {
    fields: [
      {
        fieldName: 'extendedContainers.containerSize',
      },
    ],
    name: 'CN Container Size',
    type: 'string',
  },
  {
    fields: [
      {
        fieldName: 'extendedContainers.containerType',
      },
    ],
    name: 'CN Container Type',
    type: 'string',
  },
  {
    fields: [
      {
        fieldName: 'extendedContainers.containerCount', 
      },
    ],
    name: 'CN Container Count',
    type: 'string',
  },
  {
    fields: [
      {
        fieldName: 'extendedContainers.containerCountMap', 
      },
    ],
    name: 'CN When container count used',
    type: 'string',
  },
  {
    fields: [
      {
        fieldName: 'extendedContainers.measurementUnit',
      },
    ],
    name: 'CN Quantity Type/UOM',
    type: 'string',
  },
  {
    fields: [
      {
        fieldName: 'extendedContainers.packagingType',
      },
    ],
    name: 'CN Packaging Type',
    type: 'string',
  },
  {
    fields: [
      {
        fieldName: 'extendedContainers.packagingDimensionLength.uom',
      },
    ],
    name: 'CN Pkg. Dim. Length UOM',
    type: 'string',
  },
  {
    fields: [
      {
        fieldName: 'extendedContainers.packagingDimensionWidth.uom', 
      },
    ],
    name: 'CN Pkg. Dim. Width UOM',
    type: 'string',
  },
  {
    fields: [
      {
        fieldName: 'extendedContainers.packagingDimensionHeight.uom', 
      },
    ],
    name: 'CN Pkg. Dim. Height UOM',
    type: 'string',
  },
  {
    fields: [
      {
        fieldName: 'hazmat', 
      },
    ],
    name: 'Hazmat',
    type: 'boolean',
  },
  {
    fields: [
      {
        fieldName: 'extendedCargos.hazmat',
      },
    ],
    name: 'Cargo Hazmat',
    type: 'boolean',
  },
  {
    fields: [
      {
        fieldName: 'quantityValue', 
      },
    ],
    name: 'Quantity',
    type: 'double',
  },
  {
    fields: [
      {
        fieldName: 'grossWeight', 
      },
    ],
    name: 'Gross Weight/Weight',
    type: 'double',
  },
  {
    fields: [
      {
        fieldName: 'netWeight', 
      },
    ],
    name: 'Net Weight',
    type: 'double',
  },
  {
    fields: [
      {
        fieldName: 'volumeValue', 
      },
    ],
    name: 'Volume',
    type: 'double',
  },
  {
    fields: [
      {
        fieldName: 'packagingDimensionLength.value', 
      },
    ],
    name: 'Pkg. Dim. Length',
    type: 'double',
  },
  {
    fields: [
      {
        fieldName: 'packagingDimensionWidth.value', 
      },
    ],
    name: 'Pkg. Dim. Width',
    type: 'double',
  },
  {
    fields: [
      {
        fieldName: 'packagingDimensionHeight.value',
      },
    ],
    name: 'Pkg. Dim. Height',
    type: 'double',
  },
  {
    fields: [
      {
        fieldName: 'extendedCargos.quantityValue',
      },
    ],
    name: 'Cargo Quantity',
    type: 'double',
  },
  {
    fields: [
      {
        fieldName: 'extendedCargos.grossWeight', 
      },
    ],
    name: 'Cargo Gross Weight/Weight',
    type: 'double',
  },
  {
    fields: [
      {
        fieldName: 'extendedCargos.netWeight', 
      },
    ],
    name: 'Cargo Net Weight',
    type: 'double',
  },
  {
    fields: [
      {
        fieldName: 'extendedCargos.volumeValue', 
      },
    ],
    name: 'Cargo Volume',
    type: 'double',
  },
  {
    fields: [
      {
        fieldName: 'extendedCargos.packagingDimensionLength.value', 
      },
    ],
    name: 'Cargo Pkg. Dim. Length',
    type: 'double',
  },
  {
    fields: [
      {
        fieldName: 'extendedCargos.packagingDimensionWidth.value',
      },
    ],
    name: 'Cargo Pkg. Dim. Width',
    type: 'double',
  },
  {
    fields: [
      {
        fieldName: 'extendedCargos.packagingDimensionHeight.value', 
      },
    ],
    name: 'Cargo Pkg. Dim. Height',
    type: 'double',
  },
  {
    fields: [
      {
        fieldName: 'extendedCargos.unitPrice', 
      },
    ],
    name: 'Cargo Unit Price',
    type: 'double',
  },
  {
    fields: [
      {
        fieldName: 'extendedContainers.quantityValue',
      },
    ],
    name: 'CN Quantity',
    type: 'double',
  },
  {
    fields: [
      {
        fieldName: 'extendedContainers.grossWeight',
      },
    ],
    name: 'CN Gross Weight/Weight',
    type: 'double',
  },
  {
    fields: [
      {
        fieldName: 'extendedContainers.netWeight', 
      },
    ],
    name: 'CN Net Weight',
    type: 'double',
  },
  {
    fields: [
      {
        fieldName: 'extendedContainers.volumeValue',
      },
    ],
    name: 'CN Volume',
    type: 'double',
  },
  {
    fields: [
      {
        fieldName: 'extendedContainers.packagingDimensionLength.value', 
      },
    ],
    name: 'CN Pkg. Dim. Length',
    type: 'double',
  },
  {
    fields: [
      {
        fieldName: 'extendedContainers.packagingDimensionWidth.value', 
      },
    ],
    name: 'CN Pkg. Dim. Width',
    type: 'double',
  },
  {
    fields: [
      {
        fieldName: 'extendedContainers.packagingDimensionHeight.value', 
      },
    ],
    name: 'CN Pkg. Dim. Height',
    type: 'double',
  },
  {
    fields: [
      {
        fieldName: 'packagingQuantity', 
      },
    ],
    name: 'Packaging Quantity',
    type: 'integer',
  },
  {
    fields: [
      {
        fieldName: 'teu', 
      },
    ],
    name: 'TEU',
    type: 'integer',
  },
  {
    fields: [
      {
        fieldName: 'extendedCargos.packagingQuantity', 
      },
    ],
    name: 'Cargo Packaging Quantity',
    type: 'integer',
  },
  {
    fields: [
      {
        fieldName: 'extendedContainers.packagingQuantity',
      },
    ],
    name: 'CN Packaging Quantity',
    type: 'integer',
  },
  {
    fields: [
      {
        fieldName: 'extendedContainers.teu',
      },
    ],
    name: 'CN TEU',
    type: 'integer',
  },
  {
    fields: [
      {
        fieldName: 'extendedTransshipPorts[type=POL].plannedDate',
      },
    ],
    name: 'Transshipport - Planned Date',
    type: 'ZonedDateTime',
  },
  {
    fields: [
      {
        fieldName: 'extendedTransshipPorts[type=POL].estimatedDate',
      },
    ],
    name: 'Transshipport - Estimated Date',
    type: 'ZonedDateTime',
  },
  {
    fields: [
      {
        fieldName: 'extendedTransshipPorts[type=POL].actualDate',
      },
    ],
    name: 'Transshipport - Actual Date',
    type: 'ZonedDateTime',
  },
  {
    fields: [
      {
        fieldName: 'crdValue',
      },
    ],
    name: 'CRD',
    type: 'ZonedDateTime',
  },
  {
    fields: [
      {
        fieldName: 'freightCost',
      },
    ],
    name: 'Freight Cost',
    type: 'double',
  },
  {
    fields: [
      {
        fieldName: 'cyCutoff',
      },
    ],
    name: 'CY Cutoff',
    type: 'ZonedDateTime',
  },
  {
    fields: [
      {
        fieldName: 'docCutoff',
      },
    ],
    name: 'Doc Cutoff',
    type: 'ZonedDateTime',
  },
  {
    fields: [
      {
        fieldName: 'additionalReferences[referencename=?].referencefieldName',
      },
    ],
    name: 'Additional Reference',
    type: 'any',
  },
];

const procurementTasks: ProcurementTypes[] = [
  {
    fields: [
      {
        fieldName: 'purchaseOrderLabel',
      },
    ],
    name: 'Order #',
    type: 'string',
  },
  {
    fields: [
      {
        fieldName: 'status',
      },
    ],
    name: 'Status',
    type: 'string',
    enumType: 'ProcurementStatus',
    valueMapping: {
      SUBMITTED: 'Submitted',
      REQUEST_CHANGES: 'Requested Changes',
      APPROVE_CHANGES: 'Approved Changes',
      REJECT_CHANGES: 'Rejected Changes',
      REJECTED: 'Rejected',
      CANCELLED: 'Cancelled',
      PO_CONFIRMED: 'Order Confirmed',
      CARGO_PLANNED: 'Cargo Planned',
      CARGO_READY: 'Cargo Ready',
      SHIPMENT_PLACED: 'Shipment Placed',
      SHIPMENT_CONFIRMED: 'Shipment Confirmed',
      ESCALATION_CLARIFICATION: 'Clarification',
      CARGO_DISPATCHED: 'Cargo Dispatched',
      SHIPPED: 'Shipped',
      ARRIVED_AT_POD: 'Arrived at POD',
      SHIPPED_FROM_POD_TO_DESTINATION: 'Shipped from POD',
      ARRIVED_AT_DESTINATION: 'Arrived at Destination',
    },
  },
  {
    fields: [
      {
        fieldName: 'extendedPartners[role=CONSIGNEE].groupPartner.groupName',
      },
    ],
    name: 'Partner - Consignee - Company Name',
    type: 'string',
  },
  {
    fields: [
      {
        fieldName: 'extendedPartners[role=CONSIGNEE].groupPartner.groupCode',
      },
    ],
    name: 'Partner - Consignee - Company Code',
    type: 'string',
  },
  {
    fields: [
      {
        fieldName: 'extendedPartners[role=CONSIGNEE].email',
      },
    ],
    name: 'Partner - Consignee - Email',
    type: 'string',
  },
  {
    fields: [
      {
        fieldName: 'extendedPartners[role=SHIPPER].groupPartner.groupName',
      },
    ],
    name: 'Partner - Shipper - Company Name',
    type: 'string',
  },
  {
    fields: [
      {
        fieldName: 'extendedPartners[role=SHIPPER].groupPartner.groupCode',
      },
    ],
    name: 'Partner - Shipper - Company Code',
    type: 'string',
  },
  {
    fields: [
      {
        fieldName: 'extendedPartners[role=SHIPPER].email',
      },
    ],
    name: 'Partner - Shipper - Email',
    type: 'string',
  },
  {
    fields: [
      {
        fieldName: 'extendedPartners[role=FORWARDER].groupPartner.groupName',
      },
    ],
    name: 'Partner - Forwarder - Company Name',
    type: 'string',
  },
  {
    fields: [
      {
        fieldName: 'extendedPartners[role=FORWARDER].groupPartner.groupCode',
      },
    ],
    name: 'Partner - Forwarder - Company Code',
    type: 'string',
  },
  {
    fields: [
      {
        fieldName: 'extendedPartners[role=FORWARDER].email',
      },
    ],
    name: 'Partner - Forwarder - Email',
    type: 'string',
  },
  {
    fields: [
      {
        fieldName:'extendedPartners[role=NOTIFICATION_PARTY].groupPartner.groupName',
      },
    ],
    name: 'Partner - Notify Party - Company Name',
    type: 'string',
  },
  {
    fields: [
      {
        fieldName:'extendedPartners[role=NOTIFICATION_PARTY].groupPartner.groupCode',
      },
    ],
    name: 'Partner - Notify Party - Company Code',
    type: 'string',
  },
  {
    fields: [
      {
        fieldName: 'extendedPartners[role=NOTIFICATION_PARTY].email',
      },
    ],
    name: 'Partner - Notify Party - Email',
    type: 'string',
  },
  {
    fields: [
      {
        fieldName: 'newInstructions',
      },
    ],
    name: 'Order Notes',
    type: 'string',
  },
  {
    fields: [
      {
        fieldName: 'mot',
      },
    ],
    name: 'MOT',
    type: 'string',
    enumType: 'MOT',
    defaultValue: 'Sea',
    valueMapping: {
      AIR: 'Air',
      BARGE: 'Barge',
      BARGE_RAIL_TRUCK: 'Barge Rail Truck',
      BARGE_TRUCK: 'Barge Truck',
      NOT_APPLICABLE: 'Not Applicable',
      RAIL: 'Rail',
      RAIL_TRUCK: 'Rail truck',
      SEA: 'Sea',
      SEA_AIR: 'Sea Air',
      TRUCK: 'Truck',
    },
  },
  {
    fields: [
      {
        fieldName: 'incoterm',
      },
    ],
    name: 'Incoterm',
    type: 'string',
    enumType: 'Incoterm',
    defaultValue: 'FOB',
    valueMapping: {
      CFR: 'CFR',
      CIF: 'CIF',
      CIP: 'CIP',
      CPT: 'CPT',
      DAP: 'DAP',
      DDP: 'DDP',
      DPU: 'DPU',
      EXW: 'EXW',
      FAS: 'FAS',
      FCA: 'FCA',
      FOB: 'FOB',
    },
  },
  {
    fields: [
      {
        fieldName: 'extendedTransshipPorts[type=POL].address',
      },
    ],
    name: 'Transshipport - Address',
    type: 'string',
  },
  {
    fields: [
      {
        fieldName: 'extendedTransshipPorts[type=POL].city.name',
      },
    ],
    name: 'Transshipport - City - Name',
    type: 'string',
  },
  {
    fields: [
      {
        fieldName: 'extendedTransshipPorts[type=POL].city.unLocode',
      },
    ],
    name: 'Transshipport - City - Unlocode',
    type: 'string',
  },
  {
    fields: [
      {
        fieldName: 'extendedTransshipPorts[type=POL].plannedTime',
      },
    ],
    name: 'Transshipport - Planned Time',
    type: 'string',
  },
  {
    fields: [
      {
        fieldName: 'extendedTransshipPorts[type=POL].estimatedTime',
      },
    ],
    name: 'Transshipport - Estimated Time',
    type: 'string',
  },
  {
    fields: [
      {
        fieldName: 'extendedTransshipPorts[type=POL].actualTime',
      },
    ],
    name: 'Transshipport - Actual Time',
    type: 'string',
  },
  {
    fields: [
      {
        fieldName: 'measurementUnit',
      },
    ],
    name: 'Quantity Type/UOM',
    type: 'string',
  },
  {
    fields: [
      {
        fieldName: 'packagingType',
      },
    ],
    name: 'Packaging Type',
    type: 'string',
  },
  {
    fields: [
      {
        fieldName: 'packagingDimensionLength.uom',
      },
    ],
    name: 'Pkg. Dim. Length UOM',
    type: 'string',
  },
  {
    fields: [
      {
        fieldName: 'packagingDimensionWidth.uom',
      },
    ],
    name: 'Pkg. Dim. Width UOM',
    type: 'string',
  },
  {
    fields: [
      {
        fieldName: 'packagingDimensionHeight.uom',
      },
    ],
    name: 'Pkg. Dim. Height UOM',
    type: 'string',
  },
  {
    fields: [
      {
        fieldName: 'confirmationNumber',
      },
    ],
    name: 'Order Confirmation #',
    type: 'string',
  },
  {
    fields: [
      {
        fieldName: 'extendedDeliveries.productName',
      },
    ],
    name: 'PO Product Name',
    type: 'string',
  },
  {
    fields: [
      {
        fieldName: 'extendedDeliveries.measurementUnit',
      },
    ],
    name: 'PO Quantity Type/UOM',
    type: 'string',
  },
  {
    fields: [
      {
        fieldName: 'extendedDeliveries.packagingType',
      },
    ],
    name: 'PO Packaging Type',
    type: 'string',
  },
  {
    fields: [
      {
        fieldName: 'extendedDeliveries.packagingDimensionLength.uom',
      },
    ],
    name: 'PO Pkg. Dim. Length UOM',
    type: 'string',
  },
  {
    fields: [
      {
        fieldName: 'extendedDeliveries.packagingDimensionWidth.uom',
      },
    ],
    name: 'PO Pkg. Dim. Width UOM',
    type: 'string',
  },
  {
    fields: [
      {
        fieldName: 'extendedDeliveries.packagingDimensionHeight.uom',
      },
    ],
    name: 'PO Pkg. Dim. Height UOM',
    type: 'string',
  },
  {
    fields: [
      {
        fieldName: 'extendedDeliveries.currency',
      },
    ],
    name: 'PO Currency',
    type: 'string',
  },
  {
    fields: [
      {
        fieldName: 'extendedDeliveries.hazmatDetails.unNaNumber',
      },
    ],
    name: 'PO Hazmat - UN/NA #',
    type: 'string',
  },
  {
    fields: [
      {
        fieldName: 'extendedDeliveries.hazmatDetails.hazmatClass',
      },
    ],
    name: 'PO Hazmat - Class',
    type: 'string',
  },
  {
    fields: [
      {
        fieldName: 'extendedDeliveries.hazmatDetails.hazmatPackagingGroup',
      },
    ],
    name: 'PO Hazmat - Packaging Grp',
    type: 'string',
  },
  {
    fields: [
      {
        fieldName: 'extendedDeliveries.hazmatDetails.hazmatCommodity',
      },
    ],
    name: 'PO Hazmat - Commodity',
    type: 'string',
  },
  {
    fields: [
      {
        fieldName: 'extendedDeliveries.hazmatDetails.emergencyContact',
      },
    ],
    name: 'PO Hazmat - Emergency Contact',
    type: 'string',
  },
  {
    fields: [
      {
        fieldName: 'extendedDeliveries.hazmatDetails.notes',
      },
    ],
    name: 'PO Hazmat - Notes',
    type: 'string',
  },
  {
    fields: [
      {
        fieldName: 'extendedDeliveries.newInstructions',
      },
    ],
    name: 'PO Product - Notes',
    type: 'string',
  },
  {
    fields: [
      {
        fieldName: 'extendedDeliveries.hazmat',
      },
    ],
    name: 'PO Hazmat',
    type: 'boolean',
  },
  {
    fields: [
      {
        fieldName: 'quantityValue',
      },
    ],
    name: 'Quantity',
    type: 'double',
  },
  {
    fields: [
      {
        fieldName: 'grossWeight',
      },
    ],
    name: 'Gross Weight/Weight',
    type: 'double',
  },
  {
    fields: [
      {
        fieldName: 'netWeight',
      },
    ],
    name: 'Net Weight',
    type: 'double',
  },
  {
    fields: [
      {
        fieldName: 'volumeValue',
      },
    ],
    name: 'Volume',
    type: 'double',
  },
  {
    fields: [
      {
        fieldName: 'packagingDimensionLength.value',
      },
    ],
    name: 'Pkg. Dim. Length',
    type: 'double',
  },
  {
    fields: [
      {
        fieldName: 'packagingDimensionWidth.value',
      },
    ],
    name: 'Pkg. Dim. Width',
    type: 'double',
  },
  {
    fields: [
      {
        fieldName: 'packagingDimensionHeight.value',
      },
    ],
    name: 'Pkg. Dim. Height',
    type: 'double',
  },
  {
    fields: [
      {
        fieldName: 'extendedDeliveries.quantityValue',
      },
    ],
    name: 'PO Quantity',
    type: 'double',
  },
  {
    fields: [
      {
        fieldName: 'extendedDeliveries.grossWeight',
      },
    ],
    name: 'PO Gross Weight/Weight',
    type: 'double',
  },
  {
    fields: [
      {
        fieldName: 'extendedDeliveries.netWeight',
      },
    ],
    name: 'PO Net Weight',
    type: 'double',
  },
  {
    fields: [
      {
        fieldName: 'extendedDeliveries.volumeValue',
      },
    ],
    name: 'PO Volume',
    type: 'double',
  },
  {
    fields: [
      {
        fieldName: 'extendedDeliveries.packagingDimensionLength.value',
      },
    ],
    name: 'PO Pkg. Dim. Length',
    type: 'double',
  },
  {
    fields: [
      {
        fieldName: 'extendedDeliveries.packagingDimensionWidth.value',
      },
    ],
    name: 'PO Pkg. Dim. Width',
    type: 'double',
  },
  {
    fields: [
      {
        fieldName: 'extendedDeliveries.packagingDimensionHeight.value',
      },
    ],
    name: 'PO Pkg. Dim. Height',
    type: 'double',
  },
  {
    fields: [
      {
        fieldName: 'extendedDeliveries.unitPrice',
      },
    ],
    name: 'PO Unit Price',
    type: 'double',
  },
  {
    fields: [
      {
        fieldName: 'extendedDeliveries.packagingQuantity',
      },
    ],
    name: 'PO Packaging Quantity',
    type: 'integer',
  },
  {
    fields: [
      {
        fieldName: 'packagingQuantity',
      },
    ],
    name: 'Packaging Quantity',
    type: 'integer',
  },
  {
    fields: [
      {
        fieldName: 'teu',
      },
    ],
    name: 'TEU',
    type: 'integer',
  },
  {
    fields: [
      {
        fieldName: 'orderPlacedDate',
      },
    ],
    name: 'Order Placed Date',
    type: 'ZonedDateTime',
  },
  {
    fields: [
      {
        fieldName: 'extendedTransshipPorts[type=POL].plannedDate',
      },
    ],
    name: 'Transshipport - Planned Date',
    type: 'ZonedDateTime',
  },
  {
    fields: [
      {
        fieldName: 'extendedTransshipPorts[type=POL].estimatedDate',
      },
    ],
    name: 'Transshipport - Estimated Date',
    type: 'ZonedDateTime',
  },
  {
    fields: [
      {
        fieldName: 'extendedTransshipPorts[type=POL].actualDate',
      },
    ],
    name: 'Transshipport - Actual Date',
    type: 'ZonedDateTime',
  },
  {
    fields: [
      {
        fieldName: 'orderPlacedDate',
      },
    ],
    name: 'Order Placed Date',
    type: 'ZonedDateTime',
  },
  {
    fields: [
      {
        fieldName: 'confirmedDate',
      },
    ],
    name: 'Order Confirmed Date',
    type: 'ZonedDateTime',
  },
  {
    fields: [
      {
        fieldName: 'extendedDeliveries.crdValue',
      },
    ],
    name: ' PO CRD',
    type: 'ZonedDateTime',
  },
  {
    fields: [
      {
        fieldName: 'additionalReferences[referencename=?].referencefieldName',
      },
    ],
    name: 'Additional Reference',
    type: 'any',
  },
];

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private apiUrl = 'http://localhost:5000/tasks';

  constructor(private http: HttpClient) {}

  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(this.apiUrl);
  }
  deleteTasks(task: Task): Observable<Task> {
    const url = `${this.apiUrl}/${task.id}`;
    return this.http.delete<Task>(url);
  }

  updateTaskReminder(task: Task): Observable<Task> {
    const url = `${this.apiUrl}/${task.id}`;
    return this.http.put<Task>(url, task, httpOptions);
  }
  addTask(task: Task): Observable<Task> {
    return this.http.post<Task>(this.apiUrl, task, httpOptions);
  }
}
