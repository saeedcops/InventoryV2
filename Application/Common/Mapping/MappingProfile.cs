using Application.Common.Models;
using AutoMapper;
using Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;

namespace Application.Common.Mapping
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            ApplyMappingsFromAssembly(Assembly.GetExecutingAssembly());

            CreateMap<Item, ItemDto>()
                //.ForMember(p => p.ItemType, resp => resp.MapFrom(r => r.ItemType.Name))
                .ForMember(p => p.Engineer, resp => resp.MapFrom(r => r.Engineer.Name))
                .ForMember(p => p.Warehouse, resp => resp.MapFrom(r => r.Warehouse.Name))
                .ForMember(p => p.Brand, resp => resp.MapFrom(r => r.Brand.Name))
                .ForMember(p => p.Customer, resp => resp.MapFrom(r => r.Customer.Name))
                .ForMember(p => p.ItemStatus, resp => resp.MapFrom(r => r.ItemStatus.ToString()))
                .ForMember(p => p.Created, resp => resp.MapFrom(r => r.Created.ToString()))
                .ForMember(p => p.OrderDate, resp => resp.MapFrom(r => r.OrderDate.ToString()))
                .ReverseMap();


            CreateMap<PurchaseItem, PurchaseItemsDto>()
                .ForMember(p => p.Brand, resp => resp.MapFrom(r => r.Brand.Name))
                .ForMember(p => p.Created, resp => resp.MapFrom(r => r.Created.ToString()))
                .ReverseMap();

            //CreateMap<PurchaseOrder, PurchaseOrderDto>()
            //    .ForMember(p => p.Items, resp => resp.MapFrom(r => r.Items))
            //    .ReverseMap();


            CreateMap<Part, PartDto>()
                .ForMember(p => p.Engineer, resp => resp.MapFrom(r => r.Engineer.Name))
                .ForMember(p => p.Warehouse, resp => resp.MapFrom(r => r.Warehouse.Name))
                .ForMember(p => p.PartStatus, resp => resp.MapFrom(r => r.PartStatus.ToString()))
                .ForMember(p => p.Customer, resp => resp.MapFrom(r => r.Customer.Name))
                .ForMember(p => p.OrderDate, resp => resp.MapFrom(r => r.OrderDate.ToString()))
                .ForMember(p => p.Created, resp => resp.MapFrom(r => r.Created.ToString()))

                .ReverseMap();

            CreateMap<Order, OrderDto>()
                .ForMember(p => p.Engineer, resp => resp.MapFrom(r => r.Engineer.Name))
                .ForMember(p => p.Customer, resp => resp.MapFrom(r => r.Customer.Name))
                .ForMember(p => p.OrderType, resp => resp.MapFrom(r => r.OrderType.ToString()))
                .ForMember(p => p.OrderStatus, resp => resp.MapFrom(r => r.OrderStatus.ToString()))
                .ForMember(p => p.Created, resp => resp.MapFrom(r => r.Created.ToString()))
                .ReverseMap();
        }

        private void ApplyMappingsFromAssembly(Assembly assembly)
        {
            var mapFromType = typeof(IMapFrom<>);

            var mappingMethodName = nameof(IMapFrom<object>.Mapping);

            bool HasInterface(Type t) => t.IsGenericType && t.GetGenericTypeDefinition() == mapFromType;

            var types = assembly.GetExportedTypes().Where(t => t.GetInterfaces().Any(HasInterface)).ToList();

            var argumentTypes = new Type[] { typeof(Profile) };

            foreach (var type in types)
            {
                var instance = Activator.CreateInstance(type);

                var methodInfo = type.GetMethod(mappingMethodName);

                if (methodInfo != null)
                {
                    methodInfo.Invoke(instance, new object[] { this });
                }
                else
                {
                    var interfaces = type.GetInterfaces().Where(HasInterface).ToList();

                    if (interfaces.Count > 0)
                    {
                        foreach (var @interface in interfaces)
                        {
                            var interfaceMethodInfo = @interface.GetMethod(mappingMethodName, argumentTypes);

                            interfaceMethodInfo?.Invoke(instance, new object[] { this });
                        }
                    }
                }
            }
        }
    }

}
