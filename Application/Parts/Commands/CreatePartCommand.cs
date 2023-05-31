using Application.Common.Interfaces;
using Domain.Entities;
using Domain.Enum;
using MediatR;
using System.ComponentModel.DataAnnotations;

namespace Application.Parts.Commands
{
   public record CreatePartCommand : IRequest<Part>
    {
        [Required]
        public string PartNumber { get; set; }
        public string? OracleCode { get; set; }
        public string Model { get; set; }
        public string? Description { get; set; }
        public byte[]? Image { get; set; }
        public int BrandId { get; set; }
        public int WarehouseId { get; set; }
    }

    public class CreatePartCommandHandler : IRequestHandler<CreatePartCommand, Part>
    {
        private readonly IApplicationDbContext _context;

        public CreatePartCommandHandler(IApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<Part> Handle(CreatePartCommand request, CancellationToken cancellationToken)
        {
            var entity = new Part
            {
               // Brand = _context.Brands.FirstOrDefault(b => b.Id == request.BrandId),
                BrandId = request.BrandId,
                //Warehouse = _context.Warehouses.FirstOrDefault(b => b.Id == request.WarehouseId),
                Image = request.Image,
                WarehouseId = request.WarehouseId,
                Description = request.Description,
                Model = request.Model,
                PartNumber = request.PartNumber,
                OracleCode = request.OracleCode,


            };

            //entity.AddDomainEvent(new TodoItemCreatedEvent(entity));

            _context.Parts.Add(entity);

            await _context.SaveChangesAsync(cancellationToken);

            return entity;
        }
    }

}
