using Application.Common.Interfaces;
using Application.Common.Models;
using Application.Common.Security;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Domain.Entities;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.Items.Queries
{
   // [Authorize(Roles ="AddItem")]
    public record GetItemsQuery : IRequest<List<ItemDto>>
    {
    }

    public class GetItemsQueryHandler : IRequestHandler<GetItemsQuery, List<ItemDto>>
    {
        private readonly IApplicationDbContext _context;
        private readonly IMapper _mapper;

        public GetItemsQueryHandler(IApplicationDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<List<ItemDto>> Handle(GetItemsQuery request, CancellationToken cancellationToken)
        {
            return await _context.Items
                .Include(i => i.Brand)
                .Include(i => i.Customer)
                .Include(i => i.Engineer)
                .Include(i => i.Warehouse)
                .ProjectTo<ItemDto>(_mapper.ConfigurationProvider)
                .ToListAsync();

            //return await _context.Items
            //   .ProjectTo<ItemDto>(_mapper.ConfigurationProvider)
        }
    }
}
