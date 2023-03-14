import {useState} from 'react';


interface Comment {
  body: string;
  comments: Array<Comment>
}

const dummyComments: Array<Comment> = [
  {
    body: 'This is comment 1',
    comments: [],

  },
  {
    body: 'This is comment 2',
    comments: [],
  },
  {
    body: 'This is comment 3',
    comments: [],
  },
]

export default function Home() {
  const [comments, setComments] = useState(dummyComments);

  const onComment = (newComment: Comment) => {
    setComments((prev) => [newComment, ...prev]);
  }

  return (
      <div className='flex flex-col gap-3 h-screen w-screen p-6'>
        <span className='text-3xl'>react nested comments</span>
        <CommentInput onComment={onComment}/>
        <div>
          <div className='flex flex-col gap-4'>
            {comments.map((comment) => (
                <CommentItem comment={comment}/>
            ))}
          </div>
        </div>
      </div>
  )
}

interface CommonInputProps {
  onComment: (newComment: Comment) => void;

}

const CommentInput = ({onComment}: CommonInputProps) => {
  const [commentBody, setCommentBody] = useState('');

  return (
      <div className='flex flex-col mt-4'>
        <input value={commentBody}
               onChange={(event) => setCommentBody(event.target.value)}
               placeholder='what are your thoughts?'
               type="text"
               className='border-[1px] border-zinc-400 p-4 w-3/4'

        />
        <button className='border-[1px] rounded-full border-zinc-400 w-20'
                onClick={() => {
                  onComment({body: commentBody, comments: []});
                  setCommentBody('')
                }}

        >
          Comment
        </button>
      </div>
  )
}

interface CommentItemProps {
  comment: Comment;
}

const CommentItem = ({comment}: CommentItemProps) => {
  const [isReplying, setIsReplying] = useState(false);
  const [comments, setComments] = useState(comment.comments);

  const onComment = (newComment: Comment) => {
    if (!newComment) return
    setComments(prev => [newComment, ...prev]);
  };

  return (
      <div className='flex flex-col border-[1px] border-zinc-500 rounded-md p-3 my-4'>
        <span>{comment.body}</span>
        {isReplying ? (
            <button className='border-[1px] rounded-full border-zinc-400 w-20'
                    onClick={() => setIsReplying(false)}>
              Cancel
            </button>
        ) : (
            <button className='border-[1px] rounded-full border-zinc-400 w-20'
                    onClick={() => setIsReplying(true)}>
              Reply
            </button>
        )
        }
        {
            isReplying && <CommentInput onComment={onComment}/>

        }
        <div className='flex flex-col gap-3'>
          {comments.map((comment) => (
              <CommentItem key={comment.body} comment={comment}/>
          ))}
        </div>
      </div>
  )
}
