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
    public class ItemDashboardDto 
    {

        public string Sold { get; set; }
        public string Browwed { get; set; }
        public string Store { get; set; }
        public string Total { get; set; }
        public Dictionary<int, string> Brands { get; set; }
        public Dictionary<int, string> Customers { get; set; }


        public string DegitalCheck { get; set; }
        public string Brabouz { get; set; }
        public string Panini { get; set; }
        public string Xerox { get; set; }
        public IEnumerable<int> scanner { get; set; }
        public IEnumerable<int> parts { get; set; }
        public IEnumerable<int> printer { get; set; }

    }
}
