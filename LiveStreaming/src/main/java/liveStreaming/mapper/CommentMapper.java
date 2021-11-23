package liveStreaming.mapper;
import org.springframework.stereotype.Repository;
import java.util.List;
import liveStreaming.dto.CommentDto;

@Repository
public interface CommentMapper {

    // 2021-11-22 강동하 댓글 insert
    int commentInsert(CommentDto comment);

    // 2021-11-23 강동하 댓글 select
    List<CommentDto> commentSelect(String v_code);
}



