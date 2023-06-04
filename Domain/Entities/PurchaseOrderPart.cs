using Domain.Common;
using Domain.Enum;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Entities
{
    public class PurchaseOrderPart : BaseAuditableEntity
    {
        public int Qty { get; set; }
        public PurchasePart Part { get; set; }
    }
}
