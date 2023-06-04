﻿using Domain.Common;
using Domain.Enum;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Entities
{
    public class Part :BaseAuditableEntity
    {
        [Required]
        public string PartNumber { get; set; }
        [Required]
        public string OracleCode { get; set; }
        public ItemStatus PartStatus { get; set; } = ItemStatus.stored;
        public DateTime? OrderDate { get; set; }
        public string Model { get; set; }
        public string? Description { get; set; }
        public int WarehouseId { get; set; }
        public Warehouse Warehouse { get; set; }
        public int? CustomerId { get; set; }
        public Customer? Customer { get; set; }
        public int? EngneerId { get; set; }
        public Engineer? Engineer { get; set; }
        public byte[]? Image { get; set; }
    }
}
