using Application.Common.Interfaces;
using Application.Common.Security;
using Domain.Entities;
using MediatR;
using System.ComponentModel.DataAnnotations;

namespace Application.Parts.Commands
{
    [Authorize(Roles = "User")]
    public record CreatePartCommand : IRequest<int>
    {
        [Required]
        public string PartNumber { get; set; }
        public string? OracleCode { get; set; }
        public string Model { get; set; }
        public string AddVoucher { get; set; }
        public string LocalCode { get; set; }

        public string? Description { get; set; }
        public byte[]? Image { get; set; }
        public int BrandId { get; set; }
        public int WarehouseId { get; set; }
        public int ExceededLimit { get; set; }


    }

    public class CreatePartCommandHandler : IRequestHandler<CreatePartCommand, int>
    {
        private readonly IApplicationDbContext _context;

        public CreatePartCommandHandler(IApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<int> Handle(CreatePartCommand request, CancellationToken cancellationToken)
        {
            var entity = new Part
            {
                Image = request.Image,
                WarehouseId = request.WarehouseId,
                Description = request.Description,
                Model = request.Model,
                PartNumber = request.PartNumber,
                OracleCode = request.OracleCode,
                LocalCode = request.LocalCode,
                ExceededLimit = request.ExceededLimit,
                AddVoucher = request.AddVoucher
            };

            _context.Parts.Add(entity);

            await _context.SaveChangesAsync(cancellationToken);

            return entity.Id;
        }
    }

}
