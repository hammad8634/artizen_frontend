import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

const RatingSection = () => {
  const ratings = [
    { stars: 5, percentage: 83 },
    { stars: 4, percentage: 67 },
    { stars: 3, percentage: 50 },
    { stars: 2, percentage: 33 },
    { stars: 1, percentage: 17 },
  ];

  return (
    <>
      <div className="flex flex-col md:flex-row">
        {" "}
        <div className="buyer-reviews md:w-7/12 flex ">
          <div className="container flex flex-col w-full p-6 mx-auto divide-y rounded-md divide-gray-700  ">
            <div className="flex justify-between p-4">
              <div className="flex space-x-4">
                <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center border border-gray-400">
                  <FontAwesomeIcon
                    icon={faUser}
                    className="text-yellow-600 "
                  />
                </div>
                <div>
                  <h4 className="font-bold">Leroy Jenkins</h4>
                  <span className="text-xs dark:text-gray-400">2 days ago</span>
                </div>
              </div>
              <div className="flex items-center space-x-2 dark:text-yellow-500">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                  className="w-5 h-5 fill-current"
                >
                  <path d="M494,198.671a40.536,40.536,0,0,0-32.174-27.592L345.917,152.242,292.185,47.828a40.7,40.7,0,0,0-72.37,0L166.083,152.242,50.176,171.079a40.7,40.7,0,0,0-22.364,68.827l82.7,83.368-17.9,116.055a40.672,40.672,0,0,0,58.548,42.538L256,428.977l104.843,52.89a40.69,40.69,0,0,0,58.548-42.538l-17.9-116.055,82.7-83.368A40.538,40.538,0,0,0,494,198.671Zm-32.53,18.7L367.4,312.2l20.364,132.01a8.671,8.671,0,0,1-12.509,9.088L256,393.136,136.744,453.3a8.671,8.671,0,0,1-12.509-9.088L144.6,312.2,50.531,217.37a8.7,8.7,0,0,1,4.778-14.706L187.15,181.238,248.269,62.471a8.694,8.694,0,0,1,15.462,0L324.85,181.238l131.841,21.426A8.7,8.7,0,0,1,461.469,217.37Z"></path>
                </svg>
                <span className="text-xl font-bold">4.5</span>
              </div>
            </div>
            <div className="p-4 space-y-2 text-sm ">
              <p>
                Vivamus sit amet turpis leo. Praesent varius eleifend elit, eu
                dictum lectus consequat vitae. Etiam ut dolor id justo fringilla
                finibus.
              </p>
              <p>
                Donec eget ultricies diam, eu molestie arcu. Etiam nec lacus eu
                mauris cursus venenatis. Maecenas gravida urna vitae accumsan
                feugiat. Vestibulum commodo, ante sit urna purus rutrum sem.
              </p>
            </div>
          </div>{" "}
        </div>
        <div className="flex flex-col max-w-xl p-8 shadow-sm rounded-xl lg:p-12  md:w-5/12">
          <div className="flex flex-col w-full ">
            <h2 className="text-3xl font-semibold text-center">
              Customer reviews
            </h2>
            <div className="flex flex-wrap items-center mt-2 mb-1 space-x-2">
              <div className="flex">
                {[...Array(5)].map((_, index) => (
                  <button
                    key={index}
                    type="button"
                    title={`Rate ${index + 1} stars`}
                    aria-label={`Rate ${index + 1} stars`}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      className={`w-6 h-6 ${
                        index < 3 ? "text-yellow-500" : "text-gray-600"
                      }`}
                    >
                      <path d="..." />
                    </svg>
                  </button>
                ))}
              </div>
              <span className="dark:text-gray-400">3 out of 5</span>
            </div>
            <p className="text-sm dark:text-gray-400">861 global ratings</p>
            <div className="flex flex-col mt-4">
              {ratings.map((rating, index) => (
                <div className="flex items-center space-x-1" key={index}>
                  <span className="flex-shrink-0 w-12 text-sm">
                    {rating.stars} star
                  </span>
                  <div className="flex-1 h-4 overflow-hidden rounded-sm dark:bg-gray-700">
                    <div
                      className="dark:bg-orange-300 h-4"
                      style={{ width: `${rating.percentage}%` }}
                    ></div>
                  </div>
                  <span className="flex-shrink-0 w-12 text-sm text-right">
                    {rating.percentage}%
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RatingSection;
