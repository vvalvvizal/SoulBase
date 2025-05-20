import { useQuery } from '@apollo/client';
import { SbtDocument } from '@soulBase/network/src/gql/generated';
import { useParams } from 'react-router-dom';
import { Trophy, Medal, Award, Star } from 'lucide-react';

export const SBTItem = () => {
  const { sbt } = useParams();
  const { data } = useQuery(SbtDocument, {
    variables: sbt
      ? {
          where: {
            id: parseInt(sbt),
          },
        }
      : undefined,
    skip: !sbt,
  });

  const { SBT } = data || {};
  const { id, name, description, image_url, tokenId, metadataJSON_url } =
    SBT || {};

  return (
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl border border-gray-200">
      <div className="md:flex">
        <div className="md:shrink-0">
          {image_url ? (
            <img
              className="h-48 w-full object-cover md:h-full md:w-48"
              src={image_url}
              alt={name}
            />
          ) : (
            <div className="h-48 w-full md:h-full md:w-48 bg-gray-100 flex items-center justify-center">
              <Trophy className="h-16 w-16 text-gray-400" />
            </div>
          )}
        </div>
        <div className="p-8">
          <div className="flex items-center">
            <Medal className="h-5 w-5 text-yellow-500 mr-2" />
            <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
              SBT #{tokenId}
            </div>
          </div>
          <h2 className="mt-2 text-xl font-bold text-gray-900">{name}</h2>
          <p className="mt-2 text-gray-500">{description}</p>

          <div className="mt-4 flex items-center text-gray-700">
            <Award className="h-4 w-4 mr-1" />
            <span className="text-sm">ID: {id}</span>
          </div>

          <div className="mt-6 flex items-center">
            <Star className="h-4 w-4 text-yellow-500 mr-1" />
            <a
              href={metadataJSON_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-blue-500 hover:underline"
            >
              View Metadata
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
