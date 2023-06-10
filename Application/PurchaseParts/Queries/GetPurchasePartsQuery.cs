using Application.Common.Interfaces;
using Application.Common.Models;
using Application.Common.Security;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Domain.Entities;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.PurchaseParts.Queries
{
    // [Authorize(Roles ="AddItem")]
    [Authorize(Roles = "User")]
    public record GetPurchasePartsQuery : IRequest<List<PurchasePartsDto>>
    {
    }

    public class GetPurchasePartsQueryHandler : IRequestHandler<GetPurchasePartsQuery, List<PurchasePartsDto>>
    {
        private readonly IApplicationDbContext _context;
        private readonly IMapper _mapper;


        public GetPurchasePartsQueryHandler(IApplicationDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<List<PurchasePartsDto>> Handle(GetPurchasePartsQuery request, CancellationToken cancellationToken)
        {
            return await _context.PurchaseParts
                .ProjectTo<PurchasePartsDto>(_mapper.ConfigurationProvider)
                .ToListAsync();
        }
    }
}
