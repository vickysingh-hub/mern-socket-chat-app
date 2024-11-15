import React from 'react'

const Message = () => {
  return (
    <div className='chat chat-end'>
        <div className='chat-image avatar'>
            <div className='w-10 rounded-full'>
                <img alt='Tailwind CSS chat bubble component' src={"https://cdn-icons-png.freepik.com/128/3135/3135715.png"}/>
            </div>
        </div>
        <div className={`chat-bubble text-white bg-orange-500`}>Hi! What's upp?</div>
        <div className='chat-footer opacity-50 text-xs flex gap-1 items-center'>12:42</div>
    </div>
  )
}

export default Message;