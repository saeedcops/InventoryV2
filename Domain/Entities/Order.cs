using Domain.Common;
using Domain.Enum;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Entities
{

        public class Order : BaseAuditableEntity
        {
        public OrderType OrderType { get; set; } = OrderType.Purchase;
        public OrderStatus OrderStatus { get; set; } = OrderStatus.Ready;
        public int CustomerId { get; set; }
        public Customer Customer { get; set; }
        public int EngineerId { get; set; }
        public Engineer Engineer { get; set; }
        public byte[]? Document { get; set; }
        public List<Item>? OrderItems { get; set; }
        public List<Part>? OrderParts { get; set; }
    }
}
