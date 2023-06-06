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
    public class PurchaseItemsDto : IMapFrom<PurchaseItem>
    {
        public string PartNumber { get; set; }
        public string OracleCode { get; set; }
        public string Model { get; set; }
        public string Description { get; set; }
        public string Brand { get; set; }
        public int ExceededLimit { get; set; }

        public string Created { get; set; }
        public string CreatedBy { get; set; }
    }
}
