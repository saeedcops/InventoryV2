using Application.Common.Mapping;
using Domain.Entities;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Common.Models
{
    public class PurchaseItemDto : PurchaseItemsDto
    {
        public int Qty { get; set; }
        public byte[] Image { get; set; }
    }
}
