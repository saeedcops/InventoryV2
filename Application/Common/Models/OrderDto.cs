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
    public class OrderDto : IMapFrom<Order>
    {
        public int Id { get; set; }
        public string OrderType { get; set; } 
        public string OrderStatus { get; set; } 
        public string Customer { get; set; }
        public string Engineer { get; set; }
       // public byte[] Document { get; set; }
        //public List<ItemDto> OrderItems { get; set; }
    }
}
