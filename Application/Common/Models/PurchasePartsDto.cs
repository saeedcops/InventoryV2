using Application.Common.Mapping;
using Domain.Entities;
using System.ComponentModel.DataAnnotations;

namespace Application.Common.Models
{
    public class PurchasePartsDto : IMapFrom<PurchasePart>
    {
        public string PartNumber { get; set; }
        public string OracleCode { get; set; }
        public string Description { get; set; }
        public int ExceededLimit { get; set; }

        public string Name { get; set; }
        public string Created { get; set; }
        public string CreatedBy { get; set; }
    }
}
