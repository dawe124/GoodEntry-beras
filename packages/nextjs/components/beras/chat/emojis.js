import reactStringReplace from 'react-string-replace';
import Image from "next/image";

const emojisList = ["berahead", "feelsokayman", "kek", "kekwait", "pepeclown", "midcurvio"];


const emojisFilter = (msg) => {
  return <>
  {
    reactStringReplace(msg, /(:[a-z]+:)/g, (match, i) => {
      console.log(match)
      return(<Image src={"/emojis/"+match.replace(/:/g,"")+".png"} alt={match} height={30} width={30} className="px-1 inline-block" />)
    })
  }
  </>
}

export const emojis = {
  list: emojisList, 
  filter: emojisFilter
}