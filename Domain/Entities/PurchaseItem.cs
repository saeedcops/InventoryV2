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
    public class PurchaseItem : BaseAuditableEntity
    {
        [Key]
        public string PartNumber { get; set; }
        [Required]
        public string OracleCode { get; set; }
        public string Model { get; set; }
        public string Description { get; set; }
        public int BrandId { get; set; }
        public Brand Brand { get; set; }
        public byte[]? Image { get; set; }
        public  List<PurchasePart> Parts { get; set; }
    }
}
