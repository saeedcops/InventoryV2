using Domain.Common;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Entities
{

     public class PurchaseOrder : BaseAuditableEntity
    {

        [Required]
        public string Name { get; set; }
        public byte[]? Document { get; set; }
        public List<PurchaseOrderItem>? Items { get; set; }
        public List<PurchaseOrderPart>? Parts { get; set; }
    }
}
