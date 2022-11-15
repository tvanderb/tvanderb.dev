function PLFetchResource(elementId, resourceId, callback) {
    fetch(`/resources/${resourceId}.json`)
        .then((response) => {
            if (!response.ok) {
                throw new Error(`pageloader: element={${elementId}} resource={${resourceId}} Received nonstandard HTTP status: ${response.status}`);
            }

            return response.text();
        })
        .then((data) => {
            let json;
            try {
                json = JSON.parse(data);
            } catch (error) {
                throw new Error(`pageloader: element={${elementId}} resource={${resourceId}} Resource contains invalid JSON data`)
            }

            callback(json);
        })
        .catch((_) => { throw new Error(`pageloader: element={${elementId}} resource={${resourceId}} An error occurred during resource request`)});
}

function PLInitialize(elementId, resourceId) {
    if (!elementId) {
        throw new Error(`pageloader: element={${elementId}} resource={${resourceId}} Was not provided with an element ID by parameter`);
    }

    const element = document.getElementById(elementId);
    let resource = element.getAttribute("pageloader-resource-id");
    
    if (!resource && !resourceId) {
        throw new Error(`pageloader: element={${elementId}} Was not provided with a resource ID by attribute or parameter`);
    } else if (!resource && resourceId) {
        resource = resourceId;
    }

    return {
        resource: resource,
        element: element,
        elementId: elementId,
    }
}

function PLLoadRecentPosts(elementId, resourceId, callback) {
    const { element, resource } = PLInitialize(elementId, resourceId);

    PLFetchResource(elementId, resource, (json) => {
        try {
            json["posts"].forEach((post) => {
                const li = document.createElement("li");
                const a = document.createElement("a");
                a.setAttribute("href", `/posts/${post.id}`);
                a.setAttribute("target", "_blank");
                a.text = post.date;

                li.appendChild(a);
                element.appendChild(li);
            })
            callback();
        } catch (_) {}
    });
}

function PLLoadProjects(elementId, resourceId, callback) {
    const { element, resource } = PLInitialize(elementId, resourceId);

    PLFetchResource(elementId, resource, (json) => {
        try {
            json["projects"].forEach((project) => {
                const li = document.createElement("li");
                const a = document.createElement("a");
                a.setAttribute("href", `${project.link}`);
                a.setAttribute("target", "_blank");
                a.text = project.text;

                li.appendChild(a);
                element.appendChild(li);
            })
            callback();
        } catch (_) {}
    });
}

function PLLoadLinks(elementId, resourceId, callback) {
    const { element, resource } = PLInitialize(elementId, resourceId);

    PLFetchResource(elementId, resource, (json) => {
        try {
            json["links"].forEach((link) => {
                const li = document.createElement("li");
                li.textContent = `${link["title"]}: `;

                let content;

                if (link["copy"] === true) {
                    content = document.createElement("span");
                    content.classList.add("copy");
                } else {
                    content = document.createElement("a");
                    content.setAttribute("href", link["url"]);
                    content.setAttribute("target", "_blank");
                }

                if (link["hover"]) {
                    content.setAttribute("title", link["hover"]);
                }

                content.textContent = link["content"];

                li.appendChild(content);
                element.appendChild(li);
            })
            hookCopyEvents();
        } catch (error) {
            console.error(error);
        }
    });
}