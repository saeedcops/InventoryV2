using Application.Common.Interfaces;
using Application.Common.Models;
using Application.Common.Security;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Domain.Entities;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;

namespace Application.Reports.Queries
{
   // [Authorize(Roles ="AddItem")]
    public record GetStocktakingItemsQuery : IRequest<List<ItemDto>>
    {
      
    }

    public class GetStocktakingItemsQueryHandler : IRequestHandler<GetStocktakingItemsQuery, List<ItemDto>>
    {
        private readonly IApplicationDbContext _context;
        private readonly IMapper _mapper;

        public GetStocktakingItemsQueryHandler(IApplicationDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<List<ItemDto>> Handle(GetStocktakingItemsQuery request, CancellationToken cancellationToken)
        {
            return await _context.Items
                .Where(i => i.ItemStatus == Domain.Enum.ItemStatus.stored)
                .Include(i => i.Brand)
                .Include(i => i.Customer)
                .Include(i => i.Engineer)
                .Include(i => i.Warehouse)
                .ProjectTo<ItemDto>(_mapper.ConfigurationProvider)
                .ToListAsync();

        }
    }
}
