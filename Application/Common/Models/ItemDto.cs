using Application.Common.Mapping;
using Domain.Entities;
using Domain.Enum;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Common.Models
{
    public class ItemDto : IMapFrom<Item>
    {
        [Required]
        public string PartNumber { get; set; }
        public string SerialNumber { get; set; }
        public string OracleCode { get; set; }
        public string ItemStatus { get; set; }
        public string Model { get; set; }
        public string Description { get; set; }
        public string ItemType { get; set; }
        public string Brand { get; set; }
        public string Warehouse { get; set; }
        public string Customer { get; set; }
        public string Engineer { get; set; }
        public byte[]? Image { get; set; }
    }
}
