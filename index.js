// Create animated particles
function createParticles() {
    const particlesContainer = document.getElementById('particles');
    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 4 + 's';
        particle.style.animationDuration = (Math.random() * 3 + 2) + 's';
        particlesContainer.appendChild(particle);
    }
}

// Create neural connections
function createConnections() {
    const network = document.querySelector('.neural-network');
    const central = document.querySelector('.central-node');
    // We now select the node-container for positioning calculations
    const nodes = document.querySelectorAll('.node-container:not(:has(.central-node))');
    
    nodes.forEach((nodeContainer, index) => {
        const connection = document.createElement('div');
        connection.className = 'connection';
        
        const node = nodeContainer.querySelector('.node'); // Get the actual node inside the container
        
        if (node.classList.contains('root-node')) {
            connection.classList.add('root-connection');
        } else if (node.classList.contains('effect-node')) {
            connection.classList.add('effect-connection');
        } else if (node.classList.contains('solution-node')) {
            connection.classList.add('solution-connection');
        }
        
        const centralRect = central.getBoundingClientRect();
        // Use the container for the node's position
        const nodeRect = nodeContainer.getBoundingClientRect(); 
        const networkRect = network.getBoundingClientRect();
        
        const centralX = centralRect.left + centralRect.width / 2 - networkRect.left;
        const centralY = centralRect.top + centralRect.height / 2 - networkRect.top;
        // Adjust nodeX and nodeY to point to the center of the container
        const nodeX = nodeRect.left + nodeRect.width / 2 - networkRect.left;
        const nodeY = nodeRect.top + nodeRect.height / 2 - networkRect.top;
        
        const distance = Math.sqrt(Math.pow(nodeX - centralX, 2) + Math.pow(nodeY - centralY, 2));
        const angle = Math.atan2(nodeY - centralY, nodeX - centralX);
        
        connection.style.left = centralX + 'px';
        connection.style.top = centralY + 'px';
        connection.style.width = distance + 'px';
        connection.style.transform = `rotate(${angle}rad)`;
        connection.style.animationDelay = (index * 0.1) + 's';
        
        network.appendChild(connection);
    });
}

// Initialize the neural network
document.addEventListener('DOMContentLoaded', function() {
    createParticles();
    setTimeout(createConnections, 100);
});

// Add hover effects to nodes
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.node').forEach(node => {
        node.addEventListener('mouseenter', function() {
            // Apply scale transform to the node itself
            this.style.transform = (this.style.transform || '') + ' scale(1.1)';
        });
        
        node.addEventListener('mouseleave', function() {
            // Remove the scale transform
            this.style.transform = this.style.transform.replace(' scale(1.1)', '');
        });
    });
});

