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
    public class SupplyOrderDto : IMapFrom<SupplyOrder>
    {
        public string Name { get; set; }
        public byte[] Document { get; set; }
        public List<ItemDto> SupplyOrderItems { get; set; }
        public List<PartDto> SupplyOrderParts { get; set; }
    }
}
