using AutoMapper;

public class TagProfile : Profile
{
    public TagProfile()
    {
        CreateMap<CreateTagRequestDto, Tag>();
        CreateMap<Tag, TagResponseDto>();
    }
}