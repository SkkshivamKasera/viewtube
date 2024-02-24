import React from 'react'
import { MdOutlineOutlinedFlag } from "react-icons/md"
import { FaTrashCan } from "react-icons/fa6"

const CommentOptionList = ({ className }) => {
    return (
        <ul className={`absolute w-48 p-2 shadow shadow-gray-500 ${className} rounded-sm bg-white`}>
            <li className='w-full flex items-center hover:bg-gray-200 px-2 py-1 rounded-md cursor-pointer capitalize'><FaTrashCan className='mr-2' /> delete</li>
            <li className='w-full flex items-center hover:bg-gray-200 px-2 py-1 rounded-md cursor-pointer capitalize'><MdOutlineOutlinedFlag className='mr-2' /> report</li>
        </ul>
    )
}

export default CommentOptionList
