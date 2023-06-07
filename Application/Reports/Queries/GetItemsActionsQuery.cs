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
    public record GetItemsActionsQuery : IRequest<List<ItemDto>>
    {
        [Required]
        public string From { get; set; }
        [Required]

        public string To { get; set; }
        [Required]

        public string PartNumber { get; set; }
    }

    public class GetItemsActionsQueryHandler : IRequestHandler<GetItemsActionsQuery, List<ItemDto>>
    {
        private readonly IApplicationDbContext _context;
        private readonly IMapper _mapper;

        public GetItemsActionsQueryHandler(IApplicationDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<List<ItemDto>> Handle(GetItemsActionsQuery request, CancellationToken cancellationToken)
        {
            DateTime from = Convert.ToDateTime(request.From);
            DateTime to = Convert.ToDateTime(request.To);
            return await _context.Items
                .Where(i => i.PartNumber.Equals(request.PartNumber) &&
                            i.OrderDate >= from &&
                            i.OrderDate <= to)
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
