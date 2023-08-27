using Application.Common.Interfaces;
using Application.Common.Security;
using Domain.Entities;
using Domain.Enum;
using MediatR;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Items.Commands
{
    [Authorize(Roles = "User")]
    public record CreateItemCommand : IRequest<int>
    {
        [Required]
        public string PartNumber { get; set; }
        public string SerialNumber { get; set; }
        public string OracleCode { get; set; }
        public string AddVoucher { get; set; }
        public string LocalCode { get; set; }

        public string Model { get; set; }
        public string Description { get; set; }
        public int ExceededLimit { get; set; }

        public int ItemTypeId { get; set; }
        public int BrandId { get; set; }
        public int WarehouseId { get; set; }
        public byte[]? Image { get; set; }

    }

    public class CreateItemCommandHandler : IRequestHandler<CreateItemCommand, int>
    {
        private readonly IApplicationDbContext _context;

        public CreateItemCommandHandler(IApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<int> Handle(CreateItemCommand request, CancellationToken cancellationToken)
        {
            var entity = new Item
            {
                Brand = _context.Brands.FirstOrDefault(b => b.Id == request.BrandId),
                BrandId = request.BrandId,
                Warehouse = _context.Warehouses.FirstOrDefault(b => b.Id == request.WarehouseId),
                WarehouseId = request.WarehouseId,
                //ItemType = _context.ItemTypes.FirstOrDefault(b => b.Id == request.ItemTypeId),
                //ItemTypeId = request.ItemTypeId,
                Description = request.Description,
                Model = request.Model,
                SerialNumber = request.SerialNumber,
                PartNumber = request.PartNumber,
                OracleCode = request.OracleCode,
                LocalCode = request.LocalCode,
                Image = request.Image,
                ExceededLimit = request.ExceededLimit,
                AddVoucher = request.AddVoucher,

            };

            //entity.AddDomainEvent(new TodoItemCreatedEvent(entity));

            _context.Items.Add(entity);

            await _context.SaveChangesAsync(cancellationToken);

            return entity.Id;
        }
    }

}
