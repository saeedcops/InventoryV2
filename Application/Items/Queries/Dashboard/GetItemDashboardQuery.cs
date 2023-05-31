using Application.Common.Interfaces;
using Application.Common.Models;
using Application.Common.Security;
using Domain.Entities;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System.Linq;

namespace Application.Items.Queries
{
  //  [Authorize(Roles ="AddItem")]
    public record GetItemDashboardQuery : IRequest<ItemDashboardDto>
    {
        public int Id { get; init; }
    }

    public class GetItemDashboardQueryHandler : IRequestHandler<GetItemDashboardQuery, ItemDashboardDto>
    {
        private readonly IApplicationDbContext _context;
      //  private readonly IMapper _mapper;

        public GetItemDashboardQueryHandler(IApplicationDbContext context)
        {
            _context = context;
           // _mapper = mapper;
        }

        public async Task<ItemDashboardDto> Handle(GetItemDashboardQuery request, CancellationToken cancellationToken)
        {
            var items = await _context.Items
                .Include(i=> i.Brand)
                .Include(i=> i.Customer)
                .ToListAsync();
            //var soldScanerByYear = items.Where(i => i.ItemTypeId == 1 && i.ItemStatus == Domain.Enum.ItemStatus.Sold)
            //    .GroupBy(i => i.LastModified).Select(i => new { Total =i.Count() }) ;

            IEnumerable<int> soldScanerByYear = items
                .Where(i => i.ItemTypeId == 1 && i.ItemStatus == Domain.Enum.ItemStatus.Sold)
                .OrderBy(i => i.LastModified.Value.Month)
                .GroupBy(i => i.LastModified.Value.Month)
                .Select(e => e.Count());

            IEnumerable<int> soldPartByYear = items
                .Where(i => i.ItemTypeId == 3 && i.ItemStatus == Domain.Enum.ItemStatus.Sold)
                .OrderBy(i => i.LastModified.Value.Month)
                .GroupBy(i => i.LastModified.Value.Month)
                .Select(e => e.Count());

            IEnumerable<int> soldPrinterByYear = items
                .Where(i => i.ItemTypeId == 2 && i.ItemStatus == Domain.Enum.ItemStatus.Sold)
                .OrderBy(i => i.LastModified.Value.Month)
                .GroupBy(i => i.LastModified.Value.Month)
                .Select(e => e.Count());

     

            return new ItemDashboardDto {
                Total = items.Count.ToString(),
                Browwed = items.Where(i => i.ItemStatus == Domain.Enum.ItemStatus.Borrowed).Count().ToString(),
                Sold = items.Where(i => i.ItemStatus == Domain.Enum.ItemStatus.Sold).Count().ToString(),
                Store = items.Where(i => i.ItemStatus == Domain.Enum.ItemStatus.stored).Count().ToString(),

                DegitalCheck = items.Where(i => i.BrandId == 1 && i.ItemStatus == Domain.Enum.ItemStatus.Sold).Count().ToString(),
                Brabouz = items.Where(i => i.BrandId == 2 && i.ItemStatus == Domain.Enum.ItemStatus.Sold).Count().ToString(),
                Panini = items.Where(i => i.BrandId == 3 && i.ItemStatus == Domain.Enum.ItemStatus.Sold).Count().ToString(),
                Xerox = items.Where(i => i.BrandId == 4 && i.ItemStatus == Domain.Enum.ItemStatus.Sold).Count().ToString(),

                Brands = items
                .Where(i => i.ItemStatus == Domain.Enum.ItemStatus.Sold)
                .GroupBy(i => i.BrandId)
                .Select(e => e.First().Brand.Name)
                .ToDictionary(k => k.Count()),

                //Customers = items
                //.Where(i => i.ItemStatus == Domain.Enum.ItemStatus.Sold && i.Customer != null)
                //.GroupBy(i => i.CustomerId)
                //.Select(e => e.First().Customer!.Name)
                //.ToDictionary(k => k.Count()),

                parts = soldPartByYear,
                scanner = soldScanerByYear,
                printer = soldPrinterByYear
            };
        }
    }
}
