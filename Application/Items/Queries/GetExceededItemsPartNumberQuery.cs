using Application.Common.Interfaces;
using Application.Common.Models;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.Items.Queries
{
   // [Authorize(Roles ="AddItem")]
    public record GetExceededItemsPartNumberQuery : IRequest<List<PartNumberQtyDto>>
    {
    }

    public class GetExceededItemsPartNumberQueryHandler : IRequestHandler<GetExceededItemsPartNumberQuery, List<PartNumberQtyDto>>
    {
        private readonly IApplicationDbContext _context;

        public GetExceededItemsPartNumberQueryHandler(IApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<List<PartNumberQtyDto>> Handle(GetExceededItemsPartNumberQuery request, CancellationToken cancellationToken)
        {
            return await _context.Items
                .Where(i => i.ItemStatus == Domain.Enum.ItemStatus.stored)
                .GroupBy( i => i.PartNumber)
                .Where(i => i.Count() < 5)

                //.Where(i => i.Count() < i.First().ExceededLimit)
                .Select(i => new PartNumberQtyDto { PartNumber = i.First().PartNumber,Qty =i.Count() })
                .ToListAsync();
        }
    }
}
