using AutoMapper;

public class ColorOptionProfile : Profile
{
    public ColorOptionProfile()
    {
        CreateMap<ColorOption, GetColorOptionsResponseDto>().ReverseMap();
        CreateProjection<ColorOption, GetColorOptionsResponseDto>();
    }
}