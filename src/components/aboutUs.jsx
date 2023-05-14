import React from "react";
import {
  FaCreditCard,
  FaGithub,
  FaInstagram,
  FaLinkedin,
  FaShippingFast,
  FaTwitter,
  FaUser,
} from "react-icons/fa";
import AboutUsImg from "../images/aboutUs.jpg";
import UserIcon from "../images/userIcon.png";
import Navbar from "../layouts/navbar";

const AboutUs = () => {
  const text = "Lorem ipsum dolor sit amet, consectetur adipiscing elit.";
  const textLength = text.length;
  const imageHeight = textLength > 50 ? "h-42" : "h-20";
  const imageWidth = textLength > 50 ? "w-42" : "w-20";
  const teamMembers = [
    {
      name: "Prof. Adnan Rashid",
      designation: "Project Manager",
      socialMedia: [
        { platform: "LinkedIn", link: "https://www.linkedin.com/" },
        { platform: "Twitter", link: "https://www.twitter.com/" },
        { platform: "Instagram", link: "https://www.instagram.com/" },
        { platform: "GitHub", link: "https://www.github.com/" },
      ],
    },
    {
      name: "Hammad Mukhtar",
      designation: "Founder & CEO",
      socialMedia: [
        { platform: "LinkedIn", link: "https://www.linkedin.com/" },
        { platform: "Twitter", link: "https://www.twitter.com/" },
        { platform: "Instagram", link: "https://www.instagram.com/" },
        { platform: "GitHub", link: "https://www.github.com/" },
      ],
    },
    {
      name: "Mehyar Ali",
      designation: "ML Expert",
      socialMedia: [
        { platform: "LinkedIn", link: "https://www.linkedin.com/" },
        { platform: "Twitter", link: "https://www.twitter.com/" },
        { platform: "Instagram", link: "https://www.instagram.com/" },
        { platform: "GitHub", link: "https://www.github.com/" },
      ],
    },
    {
      name: "Hamna Saeed",
      designation: "App Developer",
      socialMedia: [
        { platform: "LinkedIn", link: "https://www.linkedin.com/" },
        { platform: "Twitter", link: "https://www.twitter.com/" },
        { platform: "Instagram", link: "https://www.instagram.com/" },
        { platform: "GitHub", link: "https://www.github.com/" },
      ],
    },
  ];
  return (
    <Navbar>
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold">About Us</h1>
        </div>

        <div className="flex items-center mb-12">
          <div className="w-1/5">
            <img
              src={AboutUsImg}
              alt="About Us"
              className={`rounded-lg ${imageHeight} ${imageWidth}`}
            />
          </div>

          <div className="w-2/3 ml-8">
            <h2 className="text-2xl font-bold mb-4">Our Story</h2>
            <p className="text-lg mt-3 mb-3">
              Welcome to our e-commerce store. We are dedicated to providing the
              best shopping experience for our customers.
            </p>
            <p className="text-lg">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam
              congue sapien et ante tempus fringilla. Morbi consequat risus id
              lorem aliquet, ut commodo mauris tempor. Integer nec ligula vel
              felis vulputate commodo. Etiam dapibus purus sit amet vestibulum
              bibendum.
            </p>
            <p className="text-lg">
              Sed fringilla neque in urna cursus tincidunt. Morbi cursus purus
              ac nibh consectetur scelerisque. Maecenas id sem sed leo aliquam
              pretium ac vitae lectus. Sed tincidunt risus non urna semper
              faucibus.
            </p>
          </div>
        </div>
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Our Values</h2>
          <div className="flex">
            <div className="w-3/9 p-2">
              <div className="flex items-center mb-4">
                <FaShippingFast className="w-6 h-6 mr-2 text-blue-600" />
                <span className="text-lg font-semibold">Fast Shipping</span>
              </div>
              <p className="text-md">
                We prioritize fast and reliable shipping to ensure that our
                customers receive their orders in a timely manner.
              </p>
            </div>
            <div className="w-2/9 p-2">
              <div className="flex items-center mb-4">
                <FaUser className="w-6 h-6 mr-2 text-blue-600" />
                <span className="text-lg font-semibold">
                  Exceptional Service
                </span>
              </div>
              <p className="text-md">
                Our dedicated customer support team is always available to
                assist you with any inquiries or issues you may have.
              </p>
            </div>
            <div className="w-3/9 p-2">
              <div className="flex items-center mb-4">
                <FaCreditCard className="w-6 h-6 mr-2 text-blue-600" />
                <span className="text-lg font-semibold">Secure Payments</span>
              </div>
              <p className="text-md">
                We prioritize the security of our customers' payment information
                and ensure that all transactions are processed securely.
              </p>
            </div>
          </div>
        </div>

        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-4">Our Team</h2>
          <div className="grid grid-cols-1 gap-8 mt-8 xl:mt-16 md:grid-cols-2 xl:grid-cols-4 p-4">
            {teamMembers.map((member) => (
              <div
                className="flex flex-col items-center justify-center p-12 transition-colors duration-300 transform border cursor-pointer rounded-xl group hover:bg-blue-200 dark:border-gray-700"
                key={member.name}
              >
                <img
                  className="object-cover w-32 h-32 rounded-full ring-1 ring-black p-2"
                  src={UserIcon}
                  alt=""
                />
                <h1 className="mt-4 text-2xl font-semibold text-gray-700 capitalize">
                  {member.name}
                </h1>
                <p className="mt-2 text-gray-500 capitalize dark:text-gray-800">
                  {member.designation}
                </p>
                <div className="flex mt-3 -mx-2">
                  {member.socialMedia.map((social) => (
                    <a
                      href={social.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mx-2 text-gray-600 dark:text-gray-700 text-gray-700"
                      aria-label={social.platform}
                      key={social.platform}
                    >
                      {social.platform === "LinkedIn" && (
                        <FaLinkedin
                          size={20}
                          className="fill-current hover:text-blue-700"
                        />
                      )}
                      {social.platform === "Twitter" && (
                        <FaTwitter
                          size={20}
                          className="fill-current hover:text-blue-700"
                        />
                      )}
                      {social.platform === "Instagram" && (
                        <FaInstagram
                          size={20}
                          className="fill-current hover:text-blue-700"
                        />
                      )}
                      {social.platform === "GitHub" && (
                        <FaGithub
                          size={20}
                          className="fill-current hover:text-blue-700"
                        />
                      )}
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Navbar>
  );
};

export default AboutUs;
