import React from 'react';
import banner from '../../../assets/image/banner.jpg'
import './Contact.css'

const Contact = () => {
    return (
        <section id='contact' className="p-6 mt-10 img  text-gray-100"
        
        >
	<form  className="container w-full max-w-xl p-8 mx-auto space-y-6 rounded-md shadow  ng-untouched ng-pristine ng-valid">
		<h2 className="w-full text-2xl text-red-600 text-center font-bold leading-tight">Contact us</h2>
		<h2 className="w-full text-3xl text-center font-semibold leading-tight">Stay connected with us</h2>
		<div>
			<label htmlFor="name" className="block mb-1 ml-1">Name</label>
			<input id="name" type="text" placeholder="Your name" required="" className="block w-full p-2 rounded focus:outline-none focus:ring focus:ring-opacity-25 focus:ring-violet-400 bg-gray-100" />
		</div>
		<div>
			<label htmlFor="email" className="block mb-1 ml-1">Email</label>
			<input id="email" type="email" placeholder="Your email" required="" className="block w-full p-2 rounded focus:outline-none focus:ring focus:ring-opacity-25 focus:ring-violet-400 bg-gray-100" />
		</div>
		<div>
			<label htmlFor="message" className="block mb-1 ml-1">Message</label>
			<textarea id="message" type="text" placeholder="Message..." className="block w-full p-2 rounded autoexpand focus:outline-none focus:ring focus:ring-opacity-25 focus:ring-violet-400 bg-gray-00"></textarea>
		</div>
		<div className='text-center' >
			<button type="submit" className="flex btn items-center justify-center w-full p-3 font-semibold tracking-wide rounded-md bg-red-600 hover:bg-red-700 text-gray-100">Send</button>
		</div>
	</form>
</section>
    );
};

export default Contact;