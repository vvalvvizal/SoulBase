import { Trophy, Medal, Award, Star } from "lucide-react"


export const Card = ({sbt, onClick})=>{
    return ( <div
        className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:shadow-xl hover:-translate-y-1 cursor-pointer"
        onClick={() => onClick && onClick(sbt.id)}
      >
        <div className="relative pb-[100%]">
          {sbt.image_url ? (
            <img
              className="absolute inset-0 h-full w-full object-cover"
              src={sbt.image_url || "/placeholder.svg"}
              alt={sbt.name}
            />
          ) : (
            <div className="absolute inset-0 bg-gray-100 flex items-center justify-center">
              <Trophy className="h-16 w-16 text-gray-400" />
            </div>
          )}
          <div className="absolute top-2 right-2 bg-yellow-500 text-white text-xs font-bold px-2 py-1 rounded-full flex items-center">
            <Medal className="h-3 w-3 mr-1" />#{sbt.tokenId}
          </div>
        </div>
        <div className="p-4">
          <h3 className="font-bold text-lg truncate">{sbt.name}</h3>
          <p className="text-gray-600 text-sm line-clamp-2 h-10">{sbt.description}</p>
          <div className="mt-2 flex items-center text-xs text-blue-500">
            <Star className="h-3 w-3 mr-1" />
            <span>ID: {sbt.id}</span>
          </div>
        </div>
      </div>);
}