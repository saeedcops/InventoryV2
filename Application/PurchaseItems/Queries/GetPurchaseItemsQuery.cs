using Application.Common.Interfaces;
using Application.Common.Models;
using Application.Common.Security;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Domain.Entities;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.PurchaseItems.Queries
{
    // [Authorize(Roles ="AddItem")]
    [Authorize(Roles = "User")]
    public record GetPurchaseItemsQuery : IRequest<List<PurchaseItemsDto>>
    {
    }

    public class GetPurchaseItemsQueryHandler : IRequestHandler<GetPurchaseItemsQuery, List<PurchaseItemsDto>>
    {
        private readonly IApplicationDbContext _context;
        private readonly IMapper _mapper;

        public GetPurchaseItemsQueryHandler(IApplicationDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<List<PurchaseItemsDto>> Handle(GetPurchaseItemsQuery request, CancellationToken cancellationToken)
        {
            return await _context.PurchaseItems
                .Include(i => i.Brand)
                .ProjectTo<PurchaseItemsDto>(_mapper.ConfigurationProvider)
                .ToListAsync();
        }
    }
}
