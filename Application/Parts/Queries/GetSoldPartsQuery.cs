using Application.Common.Interfaces;
using Application.Common.Models;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.Parts.Queries
{
   // [Authorize(Roles ="AddItem")]
    public record GetSoldPartsQuery : IRequest<List<PartNumberQtyDto>>
    {
    }

    public class GetSoldPartsQueryHandler : IRequestHandler<GetSoldPartsQuery, List<PartNumberQtyDto>>
    {
        private readonly IApplicationDbContext _context;

        public GetSoldPartsQueryHandler(IApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<List<PartNumberQtyDto>> Handle(GetSoldPartsQuery request, CancellationToken cancellationToken)
        {
            return await _context.Parts
                .Where(i => i.PartStatus == Domain.Enum.ItemStatus.Sold)
                .GroupBy( i => i.PartNumber)
                .Select(i => new PartNumberQtyDto { PartNumber = i.First().Model,Qty =i.Count() })
                .ToListAsync();
        }
    }
}
