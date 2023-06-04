using Application.Common.Mapping;
using Domain.Entities;
using System.ComponentModel.DataAnnotations;

namespace Application.Common.Models
{
    public class PurchasePartDto : PurchasePartsDto
    {
        public int Qty { get; set; }

        public byte[] Image { get; set; }

    }
}
