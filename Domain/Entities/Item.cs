using Domain.Common;
using Domain.Enum;
using System.ComponentModel.DataAnnotations;

namespace Domain.Entities
{
    public class Item :BaseAuditableEntity
    {
        [Required]
        public string PartNumber { get; set; }
        [Required]
        public string SerialNumber { get; set; }
        [Required]
        public string OracleCode { get; set; }
        public string LocalCode { get; set; }
        public DateTime? OrderDate { get; set; }
        public int ExceededLimit { get; set; }
        public string AddVoucher { get; set; }

        public ItemStatus ItemStatus { get; set; } = ItemStatus.stored;
        public string Model { get; set; }
        public string Description { get; set; }
        public int BrandId { get; set; }
        public Brand Brand { get; set; }
        public int WarehouseId { get; set; }
        public Warehouse Warehouse { get; set; }
        public int? CustomerId { get; set; }
        public Customer? Customer { get; set; }
        public int? EngneerId { get; set; }
        public Engineer? Engineer { get; set; }
        public byte[]? Image { get; set; }
    }
}
