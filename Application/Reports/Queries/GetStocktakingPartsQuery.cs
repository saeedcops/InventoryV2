using Application.Common.Interfaces;
using Application.Common.Models;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.Reports.Queries
{
   // [Authorize(Roles ="AddItem")]
    public record GetStocktakingPartsQuery : IRequest<List<PartDto>>
    {
      
    }

    public class GetStocktakingPartsQueryHandler : IRequestHandler<GetStocktakingPartsQuery, List<PartDto>>
    {
        private readonly IApplicationDbContext _context;
        private readonly IMapper _mapper;

        public GetStocktakingPartsQueryHandler(IApplicationDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<List<PartDto>> Handle(GetStocktakingPartsQuery request, CancellationToken cancellationToken)
        {
            return await _context.Parts
                .Where(i => i.PartStatus == Domain.Enum.ItemStatus.stored)
                .Include(i => i.Customer)
                .Include(i => i.Engineer)
                .Include(i => i.Warehouse)
                .ProjectTo<PartDto>(_mapper.ConfigurationProvider)
                .ToListAsync();

        }
    }
}
